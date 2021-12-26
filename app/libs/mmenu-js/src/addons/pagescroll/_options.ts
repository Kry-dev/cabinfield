const options: mmOptionsPagescroll = {
    scroll: false,
    update: false
};
export default options;

/**
 * Extend shorthand options.
 *
 * @param  {object} options The options to extend.
 * @return {object}            The extended options.
 */
export function extendShorthandOptions(
    options: mmOptionsPagescroll
): mmOptionsPagescroll {

    if (typeof options == 'boolean') {
        options = {
            scroll: options
        };
    }

    if (typeof options != 'object') {
        options = {};
    }

    return options;
};
