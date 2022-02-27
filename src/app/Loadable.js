const Loader = () => (
  <div class='loader'>loading</div>
)
export const Loadable = ({ isComputing, children }) => isComputing ? <Loader /> : <>{children}</>;

