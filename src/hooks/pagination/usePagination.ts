import { useEffect, useState } from "react";

export interface Page {
  length: number;
  current: number;
  listLength: number;
}

export const initPageData: Page = {
  length: 1,
  current: 1,
  listLength: 11,
};

export default function usePagination(data: any[], listLength = 11) {
  const [page, setPage] = useState<Page>(initPageData);
  const [list, setList] = useState<any[]>([]);

  useEffect(() => {
    // Create the new page
    const newPage = {
      ...page,
      length: Math.ceil(data.length / listLength) || 0,
      listLength,
    };

    // Get data for this page
    const firstData = (page.current - 1) * page.listLength;
    const lastData = firstData + page.listLength;

    // While the firstData is in the data
    if (firstData <= data.length) setList(data.slice(firstData, lastData));

                                                                    
    setPage(newPage);
  }, [data, listLength]);

  function updatePage(pageNumber: number) {
    setPage({
      ...page,
      current: pageNumber,
    });
  }

  return {
    list,
    page,
    pageActions: {
      nextPage: () => updatePage(page.current + 1),
      prevPage: () => updatePage(page.current - 1),
    },
  };
}
