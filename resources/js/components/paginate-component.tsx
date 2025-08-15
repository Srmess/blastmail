import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { type Pagination as PaginationType } from '@/types';

interface PaginationComponent {
    links: PaginationType<unknown>['links'];
}

export function PaginationComponent({ links }: PaginationComponent) {
    return (
        <Pagination>
            <PaginationContent>
                {links.map((link, index) => {
                    if (index === 0) {
                        return (
                            <PaginationItem key={index}>
                                <PaginationPrevious href={link.url || ''} />
                            </PaginationItem>
                        );
                    }

                    if (links.length === index + 1) {
                        return (
                            <PaginationItem key={index}>
                                <PaginationNext href={link.url || ''} />
                            </PaginationItem>
                        );
                    }

                    return (
                        <PaginationItem key={index}>
                            <PaginationLink href={link.url || ''} isActive={link.active}>
                                {link.label}
                            </PaginationLink>
                        </PaginationItem>
                    );
                })}
            </PaginationContent>
        </Pagination>
    );
}
