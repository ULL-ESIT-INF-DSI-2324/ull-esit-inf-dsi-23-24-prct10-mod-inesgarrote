import "mocha";
//import { expect } from "chai";
import pkg from "chai";
const { expect } = pkg;
import { hola } from "../src/ejercicio-pe/hola.js";

describe("hola", () => {
  it("should return 'Hola mundo'", () => {
    expect(hola()).to.equal("Hola mundo");
  });
});