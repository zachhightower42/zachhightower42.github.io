/*! 2025-08-05 */
function equalHeight(a){var b=0,c=$(a);c.each(function(){var a=$(this).height();a>b&&(b=a)}),c.height(b)}