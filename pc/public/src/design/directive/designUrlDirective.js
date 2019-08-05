/**
 * Created by Administrator on 2019/5/21.
 */
//let designModule = angular.module('Angular.design');

/**
 * 组件页面
 */
designModule.directive('designWidget', ['$document', function ($document) {
    return {
        restrict: 'E',
        templateUrl: 'src/design/tmpl/sub/widget.html'
    };
}]);

/**
 * 页面渲染
 */
designModule.directive('designRender', ['$document', function ($document) {
    return {
        restrict: 'E',
        templateUrl: 'src/design/tmpl/sub/render.html'
    };
}]);

/**
 * 对组件元素进行参数编辑
 */
designModule.directive('designEdit', ['$document', function ($document) {
    return {
        restrict: 'E',
        templateUrl: 'src/design/tmpl/sub/edit.html'
    };
}]);

/**
 * 编辑页面头部
 */
designModule.directive('designHeader', ['$document', function ($document) {
    return {
        restrict: 'E',
        templateUrl: 'src/design/tmpl/sub/header.html'
    };
}]);


//***************************** 分别对组件edit和render的HTML页面数据进行渲染操作 ********************************
//paragraph
designModule.directive('designRenderParagraph', ['$document', function ($document) {
    return {
        restrict: 'E',
        templateUrl: 'src/design/tmpl/sub/render/paragraph.html'
    };
}]);
designModule.directive('designEditParagraph', ['$document', function ($document) {
    return {
        restrict: 'E',
        templateUrl: 'src/design/tmpl/sub/edit/paragraph.html'
    };
}]);

//single_select
designModule.directive('designRenderSingleSelect', ['$document', function ($document) {
    return {
        restrict: 'E',
        templateUrl: 'src/design/tmpl/sub/render/single_select.html'
    };
}]);
designModule.directive('designEditSingleSelect', ['$document', function ($document) {
    return {
        restrict: 'E',
        templateUrl: 'src/design/tmpl/sub/edit/single_select.html'
    };
}]);

//multi_select
designModule.directive('designRenderMultiSelect', ['$document', function ($document) {
    return {
        restrict: 'E',
        templateUrl: 'src/design/tmpl/sub/render/multi_select.html'
    };
}]);
designModule.directive('designEditMultiSelect', ['$document', function ($document) {
    return {
        restrict: 'E',
        templateUrl: 'src/design/tmpl/sub/edit/multi_select.html'
    };
}]);

//matrix_single_select
designModule.directive('designRenderMatrixSingleSelect', ['$document', function ($document) {
    return {
        restrict: 'E',
        templateUrl: 'src/design/tmpl/sub/render/matrix_single_select.html'
    };
}]);
designModule.directive('designEditMatrixSingleSelect', ['$document', function ($document) {
    return {
        restrict: 'E',
        templateUrl: 'src/design/tmpl/sub/edit/matrix_single_select.html'
    };
}]);

//single_scale
designModule.directive('designRenderSingleScale', ['$document', function ($document) {
    return {
        restrict: 'E',
        templateUrl: 'src/design/tmpl/sub/render/single_scale.html'
    };
}]);
designModule.directive('designEditSingleScale', ['$document', function ($document) {
    return {
        restrict: 'E',
        templateUrl: 'src/design/tmpl/sub/edit/single_scale.html'
    };
}]);

//matrix_single_scale
designModule.directive('designRenderMatrixSingleScale', ['$document', function ($document) {
    return {
        restrict: 'E',
        templateUrl: 'src/design/tmpl/sub/render/matrix_single_scale.html'
    };
}]);
designModule.directive('designEditMatrixSingleScale', ['$document', function ($document) {
    return {
        restrict: 'E',
        templateUrl: 'src/design/tmpl/sub/edit/matrix_single_scale.html'
    };
}]);

//pull_single_scale
designModule.directive('designRenderPullSingleSelect', ['$document', function ($document) {
    return {
        restrict: 'E',
        templateUrl: 'src/design/tmpl/sub/render/pull_single_select.html'
    };
}]);
designModule.directive('designEditPullSingleSelect', ['$document', function ($document) {
    return {
        restrict: 'E',
        templateUrl: 'src/design/tmpl/sub/edit/pull_single_select.html'
    };
}]);

//matrix_multi_select
designModule.directive('designRenderMatrixMultiSelect', ['$document', function ($document) {
    return {
        restrict: 'E',
        templateUrl: 'src/design/tmpl/sub/render/matrix_multi_select.html'
    };
}]);
designModule.directive('designEditMatrixMultiSelect', ['$document', function ($document) {
    return {
        restrict: 'E',
        templateUrl: 'src/design/tmpl/sub/edit/matrix_multi_select.html'
    };
}]);

//single_fill
designModule.directive('designRenderSingleFill', ['$document', function ($document) {
    return {
        restrict: 'E',
        templateUrl: 'src/design/tmpl/sub/render/single_fill.html'
    };
}]);
designModule.directive('designEditSingleFill', ['$document', function ($document) {
    return {
        restrict: 'E',
        templateUrl: 'src/design/tmpl/sub/edit/single_fill.html'
    };
}]);

//matrix_fill
designModule.directive('designRenderMatrixFill', ['$document', function ($document) {
    return {
        restrict: 'E',
        templateUrl: 'src/design/tmpl/sub/render/matrix_fill.html'
    };
}]);
designModule.directive('designEditMatrixFill', ['$document', function ($document) {
    return {
        restrict: 'E',
        templateUrl: 'src/design/tmpl/sub/edit/matrix_fill.html'
    };
}]);

//matrix_fill
designModule.directive('designRenderDetailFill', ['$document', function ($document) {
    return {
        restrict: 'E',
        templateUrl: 'src/design/tmpl/sub/render/detail_fill.html'
    };
}]);
designModule.directive('designEditDetailFill', ['$document', function ($document) {
    return {
        restrict: 'E',
        templateUrl: 'src/design/tmpl/sub/edit/detail_fill.html'
    };
}]);


/**
 * 手机预览页面
 */
overallModule.directive('designPreviewPhone', ['$document', function ($document) {
    return {
        restrict: 'E',
        templateUrl: 'src/design/tmpl/sub/preview/phone.html'
    };
}]);