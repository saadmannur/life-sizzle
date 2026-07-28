'use client';

import { Pagination } from '@heroui/react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

const PaginationForUsers = ({ totalItems, itemsPerPage = 12 }) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const page = Number(searchParams.get('page')) || 1;
    const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));

    const updatePage = (newPage) => {
        const params = new URLSearchParams(searchParams.toString());
        if (newPage > 1) {
            params.set('page', newPage);
        } else {
            params.delete('page');
        }
        router.push(`${pathname}?${params.toString()}`);
    };

    const getPageNumbers = () => {
        const pages = [1];
        if (page > 5) pages.push('ellipsis');

        const start = Math.max(2, page - 2);
        const end = Math.min(totalPages - 1, page + 2);
        for (let i = start; i <= end; i++) pages.push(i);

        if (page < totalPages - 2) pages.push('ellipsis');
        if (totalPages > 1) pages.push(totalPages);

        return pages;
    };

    if (totalItems === 0) return null;

    const startItem = (page - 1) * itemsPerPage + 1;
    const endItem = Math.min(page * itemsPerPage, totalItems);

    return (
        <Pagination className="w-full">
            <Pagination.Summary className="text-sm text-[#8A93A0]">
                Showing {startItem}-{endItem} of {totalItems} results
            </Pagination.Summary>
            <Pagination.Content className="gap-1.5">
                <Pagination.Item>
                    <Pagination.Previous
                        isDisabled={page === 1}
                        onPress={() => updatePage(page - 1)}
                        className="flex items-center gap-1 rounded-full border border-[#26313B]/10 px-3 py-2 text-sm font-medium text-[#26313B] transition-colors hover:bg-[#FBF6EC] disabled:opacity-40"
                    >
                        <Pagination.PreviousIcon />
                        <span>Previous</span>
                    </Pagination.Previous>
                </Pagination.Item>

                {getPageNumbers().map((p, i) =>
                    p === 'ellipsis' ? (
                        <Pagination.Item key={`ellipsis-${i}`}>
                            <Pagination.Ellipsis className="px-2 text-[#8A93A0]" />
                        </Pagination.Item>
                    ) : (
                        <Pagination.Item key={p}>
                            <Pagination.Link
                                isActive={p === page}
                                onPress={() => updatePage(p)}
                                className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold transition-colors ${p === page
                                        ? 'bg-[#E2636B] text-white shadow-sm shadow-[#E2636B]/30'
                                        : 'text-[#26313B] hover:bg-[#FBF6EC]'
                                    }`}
                            >
                                {p}
                            </Pagination.Link>
                        </Pagination.Item>
                    ),
                )}

                <Pagination.Item>
                    <Pagination.Next
                        isDisabled={page === totalPages}
                        onPress={() => updatePage(page + 1)}
                        className="flex items-center gap-1 rounded-full border border-[#26313B]/10 px-3 py-2 text-sm font-medium text-[#26313B] transition-colors hover:bg-[#FBF6EC] disabled:opacity-40"
                    >
                        <span>Next</span>
                        <Pagination.NextIcon />
                    </Pagination.Next>
                </Pagination.Item>
            </Pagination.Content>
        </Pagination>
    );
};

export default PaginationForUsers;