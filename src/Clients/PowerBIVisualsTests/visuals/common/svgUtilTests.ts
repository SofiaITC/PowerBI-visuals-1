﻿//-----------------------------------------------------------------------
// <copyright company="Microsoft Corporation">
//        Copyright (c) Microsoft Corporation.  All rights reserved.
// </copyright>
//-----------------------------------------------------------------------
import SVGUtil = powerbi.visuals.SVGUtil;

describe("SvgUtil tests", () => {
    it('validate the pie chart transform parsing logic for Chrome', () => {
        var transform = 'translate(110.21,46.5)';
        var parsedTransform = SVGUtil.parseTranslateTransform(transform);

        expect(parsedTransform.x).toBe('110.21');
        expect(parsedTransform.y).toBe('46.5');
    });

    it('validate the pie chart transform parsing logic for IE', () => {     
        var transform = 'translate(110.6 34.56)';
        var parsedTransform = SVGUtil.parseTranslateTransform(transform);

        expect(parsedTransform.x).toBe('110.6');
        expect(parsedTransform.y).toBe('34.56');
    });

    it('validate transform parsing logic with no y value',() => {
        var transform = 'translate(110.6)';
        var parsedTransform = SVGUtil.parseTranslateTransform(transform);

        expect(parsedTransform.x).toBe('110.6');
        expect(parsedTransform.y).toBe('0');
    });

    it('validate convertToPixelString', () => {
        var pixelString = SVGUtil.convertToPixelString(34);

        expect(pixelString).toBe('34px');
    });
});