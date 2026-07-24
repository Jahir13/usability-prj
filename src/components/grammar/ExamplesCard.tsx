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
    <div className="w-[331px]">
      <div className="flex items-center gap-3 box-border">
        <div
          className="w-[159.5px] h-[37px] rounded-xl bg-warning-soft box-border relative flex items-center px-3 py-2"
          data-node-id="81:49"
          data-name="Container"
        >
          <p className="m-0 text-label text-text-primary whitespace-nowrap">
            {example.source}
          </p>
        </div>

        <span
          className="w-3 text-caption text-text-secondary text-center shrink-0"
          data-node-id="81:51"
        >
          →
        </span>

        <div className="w-[135.5px] h-[21px] box-border flex items-center">
          <p className="text-label text-text-secondary m-0 whitespace-nowrap">
            {example.translation}
          </p>
        </div>
      </div>
    </div>
  );
}

export function ExamplesCard({ title, examples }: ExamplesCardProps) {
  return (
    <section className="w-full min-h-[215px] bg-surface-softAmber rounded-lg box-border text-left" data-node-id="81:43" data-name="Container">
      <div className="w-full h-full box-border p-6 flex flex-col">
        <div className="pb-3 box-border">
          <span
            className="text-eyebrow text-warning-500"
            data-node-id="81:46"
          >
            {title}
          </span>
        </div>

        <div
          className="flex flex-col gap-3 box-border"
          data-node-id="81:47"
        >
          {examples.map((example) => (
            <ExampleRow key={example.source} example={example} />
          ))}
        </div>
      </div>
    </section>
  );
}
