import { useId, useState } from "react";
import "./App.css";

const AccordionItem = ({
  title,
  content,
}: {
  title: string;
  content: string;
}) => {
  const [expanded, setExpanded] = useState(false);
  const id = useId();

  return (
    <div id={id} aria-expanded={expanded}>
      <h3>
        <button id={id} onClick={() => setExpanded(!expanded)}>
          {title}
        </button>
      </h3>
      <div
        role="region"
        aria-labelledby={id}
        style={{ display: expanded ? "initial" : "none" }}
      >
        <p>{content}</p>
      </div>
    </div>
  );
};

const Accordion = ({
  items,
}: {
  items: { title: string; content: string }[];
}) =>
  items.map((item) => (
    <AccordionItem title={item.title} content={item.content} />
  ));

function App() {
  return (
    <>
      <h1>Vite + React</h1>
      <h2>Github stuff</h2>
      <Accordion
        items={[
          {
            title: "What is Github and how does it work?",
            content:
              "GitHub is the home for all developers—a platform where you can share code, contribute to open source projects, or even automate your workflow with tools like GitHub Actions and Packages. If you’re just getting started with GitHub, you may know us best as a place for version control and collaboration.",
          },
          {
            title: "How do I see GitHub's availability?",
            content: "Check our real-time status report",
          },
          {
            title: "Why is GitHub so popular?",
            content:
              "GitHub is built by developers for developers, and we’re proud to be home to the world’s largest open source community. With 50 million developers and millions more open source projects, GitHub has become the go-to place to collaborate and build software together.",
          },
        ]}
      />
    </>
  );
}

export default App;
