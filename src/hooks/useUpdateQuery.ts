import { useRouter, useSearchParams } from 'next/navigation';

/**
 * URL 쿼리 파라미터를 업데이트하는 커스텀 훅
 * @returns updateQuery 함수
 */
export const useUpdateQuery = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateQuery = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());

    // null인 경우 쿼리에서 제거
    if (value === null) {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    router.push(`?${params.toString()}`, { scroll: false });
  };

  return { updateQuery };
};
