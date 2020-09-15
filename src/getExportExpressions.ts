import * as ts from "typescript";

const exportAssignment = (node: ts.ExportAssignment) => {
  if (node.expression.kind === ts.SyntaxKind.ObjectLiteralExpression) {
    const expression = node.expression as ts.ObjectLiteralExpression;

    for (const property of expression.properties) {
      switch (property.kind) {
        case ts.SyntaxKind.ShorthandPropertyAssignment:
          if (property.name.kind === ts.SyntaxKind.Identifier) {
            return property.name.text;
          }
          break;

        default:
          break;
      }
    }
  }
};

export const getExportExpressions = (source: string) => {
  const exportExpressions: (string | undefined)[] = [];

  const sourceFile = ts.createSourceFile(
    "",
    source,
    ts.ScriptTarget.ES2015,
    true
  );

  const visit = (node: ts.Node) => {
    switch (node.kind) {
      case ts.SyntaxKind.ExportAssignment:
        exportExpressions.push(exportAssignment(node as ts.ExportAssignment));
        break;

      default:
        ts.forEachChild(node, visit);
    }
  };

  ts.forEachChild(sourceFile, visit);

  return { exportExpressions };
};
