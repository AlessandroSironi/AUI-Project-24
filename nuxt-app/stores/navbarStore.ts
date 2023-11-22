/**
 * This is a global store containing the logic for
 * the navabr toggle system (this is needed since the toggle event)
 * is triggered from a component (Header) wihch has no relations
 * to the navabr in the HTML hierarchy
 */

import { defineStore } from 'pinia';

export const useNavbarStore = defineStore('navbar', () => {
    const isNavbarVisible = ref(false);

    /**
     * This workaround is needed to make sure that the sidebar
     * stays in place when a sidebar link is pressed and we are
     * in the "Desktop" view
     */
    function toggleNavbar(eventFromLink: boolean) {
        if ((window.innerWidth < 700 && eventFromLink) || !eventFromLink) {
            isNavbarVisible.value = !isNavbarVisible.value;
        }
    }

    return { isNavbarVisible, toggleNavbar };
});
