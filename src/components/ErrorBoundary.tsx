import { Component, type ErrorInfo, type ReactNode } from 'react'

type Props = { children: ReactNode }
type State = { error: Error | null }

export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null }

  static getDerivedStateFromError(error: Error): State {
    return { error }
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error('kotoba-zukan render error', error, info.componentStack)
  }

  render() {
    if (this.state.error) {
      return (
        <section className="empty" role="alert">
          <h1>うまく表示できませんでした</h1>
          <p>ページを再読み込みしてもう一度お試しください。</p>
          <button type="button" className="btn btn--primary" onClick={() => window.location.reload()}>
            再読み込み
          </button>
        </section>
      )
    }
    return this.props.children
  }
}
