import { Board, Header } from '@/components';

export default function Home() {
  return (
    <main>
      {/* header */}
      <Header />
      {/* Board */}
      <h1>Trello 2.0 AI Clone</h1>
      <Board />
    </main>
  );
}
