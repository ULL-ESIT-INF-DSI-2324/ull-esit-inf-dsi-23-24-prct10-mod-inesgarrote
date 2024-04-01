import "mocha";
//import { expect } from "chai";
import pkg from "chai";
const { expect } = pkg;
import {add  } from "../src/hola.js";

describe("add", () => {
  it("should add two numbers", () => {
    const result = add(1, 2);
    expect(result).to.equal(4);
  });
});

