"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var attachPaths_1 = __importStar(require("../attachPaths"));
describe('attachPaths', function () {
    it('attaches a path to a single node based on slug', function () {
        var mockNode = {
            slug: 'foo',
            children: [],
        };
        expect(attachPaths_1.default(mockNode).path).toStrictEqual('foo/');
    });
    it('sets a path of "/" for root level node', function () {
        var mockNode = {
            slug: '',
            children: [],
        };
        expect(attachPaths_1.default(mockNode).path).toStrictEqual('/');
    });
});
describe('attachPath', function () {
    it('attaches a path to a single node based on parentPath + slug', function () {
        var mockNode = {
            slug: 'foo',
            children: [],
        };
        expect(attachPaths_1.attachPath(mockNode, 'bar/').path).toStrictEqual('bar/foo/');
    });
    it('attaches a "/" to the end of a root path', function () {
        var mockNode = {
            slug: 'foo',
            children: [],
        };
        expect(attachPaths_1.attachPath(mockNode, '').path).toStrictEqual('foo/');
    });
    it('handles child nodes', function () {
        var mockNode = {
            slug: '',
            children: [
                {
                    slug: 'bar',
                    children: [],
                },
                {
                    slug: 'bam',
                    children: [
                        {
                            slug: 'chip',
                            children: [],
                        },
                        {
                            slug: 'chop',
                            children: [],
                        },
                    ],
                },
                {
                    slug: 'bim',
                    children: [],
                },
            ],
        };
        var result = attachPaths_1.attachPath(mockNode, '');
        expect(result.path).toStrictEqual('/');
        expect(result.children[0].path).toStrictEqual('/bar/');
        expect(result.children[1].path).toStrictEqual('/bam/');
        expect(result.children[2].path).toStrictEqual('/bim/');
        expect(result.children[1].children[0].path).toStrictEqual('/bam/chip/');
        expect(result.children[1].children[1].path).toStrictEqual('/bam/chop/');
    });
});
