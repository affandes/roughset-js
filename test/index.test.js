import RoughSetJs from "../dist/roughset";

test('Hello', () => {
    let obj = new RoughSetJs();
    expect(obj.data).toEqual([])
})