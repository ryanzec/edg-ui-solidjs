/* @refresh reload */
import '$/core/types/solid-js';

import '@fontsource/open-sans';
import '@fontsource/open-sans/400.css';
import '@fontsource/open-sans/600.css';
import '@fontsource/open-sans/700.css';

import '$/core/styles/variables.css';
import '$/core/styles/manual-variables.css';
import '$/application/styles/variables.css';
import '$/core/styles/keyframes.css';
import '$/core/styles/normalize.css';
import '$/core/styles/base.css';
import { render } from 'solid-js/web';

import Application from '$web/components/application';

const start = async () => {
  render(() => <Application.Router />, document.getElementById('application-mount') as HTMLElement);
};

start();
