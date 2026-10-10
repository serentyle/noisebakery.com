type Props = {
  tag: string;
};

export function TagLink({ tag }: Props) {
  return (
    <a className="link" href={`/blog/?tag=${encodeURIComponent(tag)}`}>
      {`#${tag}`}
    </a>
  );
}
