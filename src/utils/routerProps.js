import PropTypes from 'prop-types';

const routerProps = {
  location: PropTypes.shape({
    hash: PropTypes.string.isRequired,
    key: PropTypes.string,
    pathname: PropTypes.string.isRequired,
    search: PropTypes.string.isRequired,
    state: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.bool,
      PropTypes.number,
      PropTypes.object,
      PropTypes.string,
    ]),
  }),
  history: PropTypes.shape({
    action: PropTypes.oneOf(['PUSH', 'REPLACE', 'POP']).isRequired,
    block: PropTypes.func.isRequired,
    canGo: PropTypes.func,
    createHref: PropTypes.func.isRequired,
    // entries: PropTypes.arrayOf(routerProps.location),
    go: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
    goForward: PropTypes.func.isRequired,
    index: PropTypes.number,
    length: PropTypes.number.isRequired,
    listen: PropTypes.func.isRequired,
    // location: this.location,
    push: PropTypes.func.isRequired,
    replace: PropTypes.func.isRequired,
  }),
  match: PropTypes.shape({
    isExact: PropTypes.bool,
    params: PropTypes.object.isRequired,
    path: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }),
  childRoute: PropTypes.shape({
    path: PropTypes.string.isRequired,
    exact: PropTypes.bool,
    component: PropTypes.element.isRequired,
    // routes: PropTypes.arrayOf(this.childRoute),
  }),
  route: PropTypes.shape({
    component: PropTypes.element,
    // routes: PropTypes.arrayOf(this.childRoute),
  }),
}

export default routerProps;