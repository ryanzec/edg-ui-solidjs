import Dropzone, { type DropzoneFile } from 'dropzone';
import { createEffect, createSignal, mergeProps, onCleanup, Show } from 'solid-js';
import Icon from '$/core/components/icon';
import { fileUtils } from '$/core/utils/file';
import { loggerUtils } from '$/core/utils/logger';

export type FileUploadProps = {
  maximumFileSizeMB?: number;
  acceptedFileTypes?: string;
  maximumFileCount?: number;
};

const FileUpload = (passedProps: FileUploadProps) => {
  const props = mergeProps(
    {
      maximumFileSizeMB: 10,
      acceptedFileTypes: 'image/*',
      maximumFileCount: 1,
    },
    passedProps,
  );

  const [inputRef, setInputRef] = createSignal<HTMLElement | undefined>();
  const [file, setFile] = createSignal<DropzoneFile>();
  const [dropzone, setDropzone] = createSignal<Dropzone>();

  createEffect(() => {
    const currentInputRef = inputRef();

    if (!currentInputRef || dropzone()) {
      return;
    }

    const dropzoneInstance = new Dropzone(currentInputRef, {
      url: '/',
      autoProcessQueue: false,
      maxFilesize: props.maximumFileSizeMB,
      acceptedFiles: props.acceptedFileTypes,
      addRemoveLinks: false,
      createImageThumbnails: false,
      previewTemplate: '<div style="display:none;"></div>',
      maxFiles: props.maximumFileCount,

      init: function () {
        this.on('addedfile', (file) => {
          setFile(file);
        });

        // since we use the dropzone to handle the hard part of file uploading, we don't care about the internal
        // files list of dropzone
        this.on('maxfilesexceeded', (file) => {
          this.removeAllFiles();

          setFile(file);
        });

        this.on('error', (_file, errorMessage) => {
          loggerUtils.error({
            type: 'file-drag-drop-error',
            message: errorMessage,
          });
        });
      },
    });

    setDropzone(dropzoneInstance);
  });

  onCleanup(() => {
    dropzone()?.destroy();
  });

  return (
    <div>
      <div
        ref={setInputRef}
        class="w-full h-[100px] bg-brand-100 hover:bg-brand-200 hover:cursor-pointer rounded-base flex justify-center items-center"
      >
        Drop a file or click to select a file
      </div>
      <Show when={file()}>
        {(file) => {
          return (
            <div class="flex items-center gap-4xs">
              {file().name} ({fileUtils.convertToFileSize(file().size)})
              <Icon
                icon="trash"
                onClick={() => {
                  setFile(undefined);
                }}
              />
            </div>
          );
        }}
      </Show>
    </div>
  );
};

export default FileUpload;
