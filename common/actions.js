const SET_TABINDEX = 'SET_TABINDEX';

export function set_tab_index(index) {
    return {
        type:SET_TABINDEX,
        payload:index
    }
}