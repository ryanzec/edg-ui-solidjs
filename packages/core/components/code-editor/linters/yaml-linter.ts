import type { Diagnostic } from '@codemirror/lint';
import type { Extension } from '@codemirror/state';
import type { EditorView } from '@codemirror/view';
import { type YAMLError, parse } from 'yaml';

interface EditorConfig {
  doc: string;
  extensions: Extension[];
}

interface YAMLErrorWithSource extends YAMLError {
  source?: {
    range?: {
      start: number;
      end: number;
    };
  };
}

// Create a custom YAML linter function
const yamlLinter = (view: EditorView): Diagnostic[] => {
  const doc: string = view.state.doc.toString();
  const diagnostics: Diagnostic[] = [];

  try {
    parse(doc);
  } catch (error: unknown) {
    const yamlError = error as YAMLErrorWithSource;

    if (yamlError.source?.range) {
      const { start, end } = yamlError.source.range;

      diagnostics.push({
        from: start,
        to: end || start,
        severity: 'error',
        message: yamlError.message || 'YAML syntax error',
      });
    } else {
      // Fallback if range information is not available
      diagnostics.push({
        from: 0,
        to: 0,
        severity: 'error',
        message: yamlError.message || 'YAML syntax error',
      });
    }
  }

  return diagnostics;
};

export { yamlLinter };
