import RoughSetJs from "../dist/roughset";
import IsSample01 from "./fixtures/is-sample-01";

var obj = new RoughSetJs();
const sample = IsSample01;

describe('Creating object', () => {
    it('Is an object?', () => {
        expect(typeof obj).toBe('object')
    });
    it('Is a RoughSetJs instance?', () => {
        expect(obj.constructor.name).toBe('RoughSetJs')
    });
    it('Has an empty items at first?', () => {
        expect(obj.getItems()).toEqual([])
    });
    it('Has an empty attributes at first?', () => {
        expect(obj.getAttributes()).toEqual([])
    });
});

describe('Set some properties with Sample01', () => {
    it('Set items?', () => {
        obj.setItems(sample.items);
        expect(obj.getItems()).toEqual(sample.items);
        expect(obj.getAttributes()).toEqual([]);
    });
    it('Set attributes?', () => {
        obj.setAttributes(sample.attributes);
        expect(obj.getItems()).toEqual(sample.items);
        expect(obj.getAttributes()).toEqual(sample.attributes);
    });
    it('Has decision index?', () => {
        expect(obj.getDecisionIndex()).toBe(sample.attributes.length-1)
    });
    it('Has non-numeric value?', () => {
        expect(obj.getHasNonNumeric()).not.toBeTruthy()
    });
    it('Has Information System?', () => {
        expect(obj.getInformationSystem()).toEqual({U: sample.items, A: sample.attributes})
    })
});

describe('Default properties', () => {
    it('Has an empty dictionary at first?', () => {
        expect(obj.getDictionary()).toEqual([])
    });
    it('Has not dicretized at first yet?', () => {
        expect(obj.getHasDiscretized()).toBeFalsy()
    });
    it('Has an empty discretized items at first?', () => {
        expect(obj.getItemsDiscretized()).toEqual([])
    });
    it('Has Indiscernibility for all attributes to be null?', () => {
        expect(obj.getIndiscernibilityAll()).toBeNull()
    });
});

describe('Calculating Reduct', () => {
    it('Calculated reduct?', () => {
        obj.reduct();
        expect(obj.getHasFindReduct()).toBeTruthy()
    });
    it('Has an empty dictionary?', () => {
        expect(obj.getDictionary()).toEqual([])
    });
    it('Has discretized?', () => {
        expect(obj.getHasDiscretized()).toBeTruthy()
    });
    it('Is items equal to discretized items?', () => {
        expect(obj.getItemsDiscretized()).toEqual(obj.getItems())
    });
    it('Is Indiscernibility for all attributtes corrects?', () => {
        expect(obj.getIndiscernibilityAll()).toEqual(sample.indiscernibilityAll)
    });
    it('Is Indiscernibility for P-{a} attributes corrects?', () => {
        expect(obj.getIndiscernibilitySubstract()).toEqual(sample.indiscernibilitySubstract)
    });
});