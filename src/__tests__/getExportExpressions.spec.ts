import { getExportExpressions } from "../getExportExpressions";

import fs from "fs";
import path from "path";

const getSource = (fixtureFileName: string) => {
  const source = fs.readFileSync(
    path.join(__dirname, "fixtures", fixtureFileName),
    {
      encoding: "utf-8",
    }
  );

  return { source };
};

describe("getExportExpressions", () => {
  describe('ExportAssignment', () => {
    it("ShorthandPropertyAssignment", () => {
      const { source } = getSource("ExportAssignment/ShorthandPropertyAssignment.ts");
  
      const result = getExportExpressions(source);
  
      expect(result).toEqual({ exportExpressions: ["expressionVar1", 'expressionVar2', 'expressionVar3'] });
    });
  });
});
