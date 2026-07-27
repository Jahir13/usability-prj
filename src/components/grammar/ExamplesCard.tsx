import { ReadableRegion } from "../ui/ReadableRegion";

type ExamplePair = {
  source: string;
  translation: string;
};

type ExamplesCardProps = {
  title: string;
  examples: ExamplePair[];
};

function ExampleRow({ example }: { example: ExamplePair }) {
  return (
    <li className="w-full m-0">
      <div className="flex items-center gap-3 box-border flex-wrap">
        <span
          className="min-w-[159.5px] min-h-[37px] rounded-xl bg-warning-soft box-border relative flex items-center px-3 py-2"
          data-node-id="81:49"
          data-name="Container"
        >
          <span className="m-0 text-label text-text-primary">{example.source}</span>
        </span>

        {/* The arrow is decorative; the relation is spoken as "in Spanish". */}
        <span aria-hidden="true" className="w-3 text-caption text-text-secondary text-center shrink-0">
          →
        </span>
        <span className="sr-only">in Spanish:</span>

        <span className="box-border flex items-center">
          <span className="text-label text-text-secondary m-0">{example.translation}</span>
        </span>
      </div>
    </li>
  );
}

/**
 * Examples with their translation. Focusable region so the examples are part
 * of the keyboard reading order of the lesson.
 */
export function ExamplesCard({ title, examples }: ExamplesCardProps) {
  return (
    <ReadableRegion
      label={`${examples.length} examples with Spanish translation`}
      className="w-full min-h-[215px] bg-surface-softAmber text-left"
      data-node-id="81:43"
    >
      <div className="w-full h-full box-border p-6 flex flex-col">
        <div className="pb-3 box-border">
          <h2 className="text-eyebrow text-warning-500 m-0" data-node-id="81:46">
            {title}
          </h2>
        </div>

        <ul className="flex flex-col gap-3 box-border list-none p-0 m-0" data-node-id="81:47">
          {examples.map((example) => (
            <ExampleRow key={example.source} example={example} />
          ))}
        </ul>
      </div>
    </ReadableRegion>
  );
}
