import RoughSetJs from "../dist/roughset";
import IsSample02 from "./fixtures/is-sample-02";
import equivalenceClassSample01 from "./fixtures/equivalence-class-sample-01";

var obj = new RoughSetJs();

test('Hi, i am an object of RoughSetJs!', () => {
    expect(typeof obj).toEqual('object')
});

test('I have an empty items at first.', () => {
    expect(obj.getItems()).toEqual([])
});

test('I have an empty attributes at first.', () => {
    expect(obj.getAttributes()).toEqual([])
});

test('I set items', () => {
    let sample = IsSample02;
    obj.setItems(sample.items);
    expect(obj.getItems()).toEqual(sample.items)
});

test('I set some attributes', () => {
    let sample = IsSample02;
    obj.setAttributes(sample.attributes);
    expect(obj.getAttributes()).toEqual(sample.attributes)
});

test('I calculate inconsisten indexes', () => {
    let results = equivalenceClassSample01;
    expect(obj.getIndiscernibility(['x1','x2','x3','x4'])).toEqual(results)
});