export default function Tooltip(props) {
  return (
    <div class="tooltip">
      {props.button}
      <span class="tooltiptext">{props.children}</span>
    </div>
  );
}
