import RoughSetJs from "../dist/roughset";
import IsSample03 from "./fixtures/is-sample-03";
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
    let sample = IsSample03;
    obj.setItems(sample.items);
    expect(obj.getItems()).toEqual(sample.items)
});

test('I set some attributes', () => {
    let sample = IsSample03;
    obj.setAttributes(sample.attributes);
    expect(obj.getAttributes()).toEqual(sample.attributes)
});

test('I look if items has non numeric?', () => {
    expect(obj.hasNonNumeric()).toEqual(true)
});

describe('console', () => {
    it('log to console', () => {
        console.log('No one here')
    });
});

test('I calculate inconsisten indexes', () => {
    let results = equivalenceClassSample01;
    expect(obj.getIndiscernibility(['p1','p2','p3'])).toEqual(results)
});