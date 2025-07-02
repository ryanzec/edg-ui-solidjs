import type { ClickOutsideDirectiveOptions } from '$/core/directives/click-outside-directive/click-outside-directive';

declare module 'solid-js' {
  namespace JSX {
    interface Directives {
      // custom directives
      formDirective: boolean;
      clickOutsideDirective: ClickOutsideDirectiveOptions;
    }
  }
}
