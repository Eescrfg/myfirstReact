import Loadable from 'react-loadable'

const loadable = (loader: any) => {
  return Loadable({
    loader,
    loading() {
      return null
    },
  })
}
export default loadable
