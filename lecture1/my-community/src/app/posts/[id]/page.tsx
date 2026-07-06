import { mockPosts } from '@/data/mockData';

export function generateStaticParams() {
  return mockPosts.map((post) => ({ id: post.id }));
}

interface Props {
  params: Promise<{ id: string }>;
}

export default async function PostLegacyPage({ params }: Props) {
  const { id } = await params;
  const script = `var s=location.pathname.split('/');s.pop();window.location.replace(s.join('/')+'?id=${id}');`;
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
