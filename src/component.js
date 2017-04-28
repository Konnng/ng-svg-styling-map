export default {
  bindings: {
    path: '@',
    base: '<',
    map: '<',
    elmAct: '&'
  },
  template: `<object type="image/svg+xml" ng-attr-data="{{$ctrl.path}}"></object>`,
  controller: function ($element) {
    let ctrl = this, svg, count = 0

    let update = map => {
      Object.keys(map).map(selector => {
        return {
          nodes: svg.querySelectorAll(selector),
          props: map[selector]
        }
      }).map(control => {
        control.nodes.forEach(node => {
          for (let prop in control.props) {
            switch(prop) {
              case 'click': node.addEventListener('click', control.props[prop].bind(this), false); break;
              case 'dbclick': node.addEventListener('dbclick', control.props[prop].bind(this), false); break;
              default: node.style[prop] = control.props[prop]
            }
          }
        })
      })
    }
    let apply = () => {
      if (svg && ctrl.base) update(ctrl.base)
      if (svg && ctrl.map) update(ctrl.map)
    }
    ctrl.$onChanges = () => apply()
    ctrl.$doCheck = () => apply()
    ctrl.$postLink = () => {
      let object = $element[0].querySelector('object')
      object.addEventListener('load', () => {
        svg = object.contentDocument
        if (count == 0) apply()
      }, false)
    }
  }
}