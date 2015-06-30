//-----------------------------------------------------------------------
// <copyright company="Microsoft Corporation">
//        Copyright (c) Microsoft Corporation.  All rights reserved.
// </copyright>
//-----------------------------------------------------------------------
var powerbitests;
(function (powerbitests) {
    describe("converterHelper tests", function () {
        it('categoryIsAlsoSeriesRole default', function () {
            var dataView = createCategoricalDataView({});
            expect(powerbi.visuals.converterHelper.categoryIsAlsoSeriesRole(dataView, 'Series', 'Category')).toBeFalsy();
            // Only a 'Series' role prevents us from using the Default strategy
            var dataView = createCategoricalDataView({ 'Category': true });
            expect(powerbi.visuals.converterHelper.categoryIsAlsoSeriesRole(dataView, 'Series', 'Category')).toBeFalsy();
            var dataView = createCategoricalDataView({ 'E === mc^2': true });
            expect(powerbi.visuals.converterHelper.categoryIsAlsoSeriesRole(dataView, 'Series', 'Category')).toBeFalsy();
        });
        it('categoryIsAlsoSeriesRole series and category', function () {
            var dataView = createCategoricalDataView({ 'Series': true, 'Category': true });
            expect(powerbi.visuals.converterHelper.categoryIsAlsoSeriesRole(dataView, 'Series', 'Category')).toBe(true);
            var dataView = createCategoricalDataView({ 'Series': true, 'F === ma': true, 'Category': true });
            expect(powerbi.visuals.converterHelper.categoryIsAlsoSeriesRole(dataView, 'Series', 'Category')).toBe(true);
        });
        it('getPivotedCategories default', function () {
            var dataView = createCategoricalDataView({});
            var categoryInfo = powerbi.visuals.converterHelper.getPivotedCategories(dataView, formatStringProp());
            // Note: Since the result includes a function property we can't perform a toEqual directly on the result, so check each part individually.
            expect(categoryInfo.categories).toEqual(['a', 'b']);
            expect(categoryInfo.categoryIdentities).toEqual([dataView.categories[0].identity[0], dataView.categories[0].identity[1]]);
        });
        it('getPivotedCategories empty categories', function () {
            var dataView = createCategoricalDataView({});
            // Empty the categories array
            dataView.categories = [];
            var categoryInfo = powerbi.visuals.converterHelper.getPivotedCategories(dataView, formatStringProp());
            validateEmptyCategoryInfo(categoryInfo);
        });
        it('getPivotedCategories empty category values', function () {
            var dataView = createCategoricalDataView({});
            // Empty the category values array
            dataView.categories[0].values = [];
            var categoryInfo = powerbi.visuals.converterHelper.getPivotedCategories(dataView, formatStringProp());
            expect(categoryInfo.categories).toEqual([]);
            expect(categoryInfo.categoryIdentities).toBeUndefined();
        });
        function validateEmptyCategoryInfo(categoryInfo) {
            // Note: Since the result includes a function property we can't perform a toEqual directly on the result, so check each part individually.
            expect(categoryInfo.categories).toEqual([null]);
            expect(categoryInfo.categoryIdentities).toBeUndefined();
        }
        function createCategoricalDataView(roles) {
            var metadata = {
                columns: [
                    { name: 'col1', roles: roles },
                    { name: 'col2', isMeasure: true, roles: { 'Y': true } },
                ]
            };
            return {
                categories: [{
                    source: metadata.columns[0],
                    values: ['a', 'b'],
                    identity: [
                        powerbitests.mocks.dataViewScopeIdentity('a'),
                        powerbitests.mocks.dataViewScopeIdentity('b'),
                    ]
                }],
                values: powerbi.data.DataViewTransform.createValueColumns([
                    {
                        source: metadata.columns[1],
                        values: [100, 200]
                    }
                ])
            };
        }
        function formatStringProp() {
            return { objectName: 'general', propertyName: 'formatString' };
        }
    });
})(powerbitests || (powerbitests = {}));
