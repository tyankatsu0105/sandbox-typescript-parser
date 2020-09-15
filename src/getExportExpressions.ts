import * as ts from "typescript";

type ExportExpressions = (string | undefined)[]

const exportAssignment = (node: ts.ExportAssignment, exportExpressions: ExportExpressions) => {
  if (node.expression.kind === ts.SyntaxKind.ObjectLiteralExpression) {
    const expression = node.expression as ts.ObjectLiteralExpression;

    expression.properties.forEach((property) => {
      switch (property.kind) {
        case ts.SyntaxKind.ShorthandPropertyAssignment:
          if (property.name.kind === ts.SyntaxKind.Identifier) {
            exportExpressions.push(property.name.text);
          }
          break;

        default:
          break;
      }
    })
  }
};

export const getExportExpressions = (source: string) => {
  const exportExpressions: ExportExpressions = [];

  const sourceFile = ts.createSourceFile(
    "",
    source,
    ts.ScriptTarget.ES2015,
    true
  );

  const visit = (node: ts.Node) => {
    switch (node.kind) {
      case ts.SyntaxKind.ExportAssignment:
        exportAssignment(node as ts.ExportAssignment, exportExpressions);
        break;

      default:
        ts.forEachChild(node, visit);
    }
  };

  ts.forEachChild(sourceFile, visit);

  return { exportExpressions };
};
