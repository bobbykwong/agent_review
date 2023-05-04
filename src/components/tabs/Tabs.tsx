import { Tab } from "@headlessui/react";
import clsx from "clsx";
import { ReactElement } from "react";

interface TabsProps {
  tabs: {
    label: string;
    content: ReactElement;
  }[];
}

export function Tabs({ tabs }: TabsProps) {
  return (
    <Tab.Group as="div" className="overflow-auto w-full">
      <Tab.List className="flex gap-8 min-w-fit border-b border-slate-200">
        {tabs.map(({ label }, i) => (
          <Tab key={i} className="outline-none">
            {({ selected }) => (
              <div className="relative py-4">
                <p
                  className={clsx(
                    { "text-slate-800": selected },
                    { "text-slate-500": !selected }
                  )}
                >
                  {label}
                </p>

                {selected && (
                  <span className="absolute left-0 bottom-0 h-[5px] w-full bg-primary rounded-t-xl translate-y-0" />
                )}
              </div>
            )}
          </Tab>
        ))}
      </Tab.List>
      <Tab.Panels>
        {tabs.map(({ content }, i) => (
          <Tab.Panel key={i} className="py-8">
            {content}
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  );
}
