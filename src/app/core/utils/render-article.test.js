import { addRootSerialNumbers } from "./render-article"

test("Adds serial numbers to sequential node objects", () => {
  expect(addRootSerialNumbers([{}, {}])).toEqual([{ serial: 0 }, { serial: 1 }])
})
