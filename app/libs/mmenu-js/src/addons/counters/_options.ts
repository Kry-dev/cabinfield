const options: mmOptionsCounters = {
    add: false,
    addTo: 'panels',
    count: false
};
export default options;

/**
 * Extend shorthand options.
 *
 * @param  {object} options The options to extend.
 * @return {object}            The extended options.
 */
export function extendShorthandOptions(
    options: mmOptionsCounters
): mmOptionsCounters {
    if (typeof options == 'boolean') {
        options = {
            add: options,
            addTo: 'panels',
            count: options
        };
    }

    if (typeof options != 'object') {
        options = {};
    }

    if (options.addTo == 'panels') {
        options.addTo = '.mm-listview';
    }

    return options;
}
