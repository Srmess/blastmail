import { useForm } from '@inertiajs/react';
import { Trash2, Undo2 } from 'lucide-react';
import { Button } from '../ui/button';

export const DeleteEntityButton = ({ entityId, deleteRoute }: { entityId: number; deleteRoute: string }) => {
    const { delete: destroy, processing } = useForm();

    return (
        <Button
            variant={'destructive'}
            size={'icon'}
            onClick={() => {
                destroy(route(deleteRoute, entityId));
            }}
            isLoading={processing}
        >
            <Trash2 />
        </Button>
    );
};

export const RestoreEntityButton = ({ entityId, restoreRoute }: { entityId: number; restoreRoute: string }) => {
    const { patch, processing } = useForm();

    return (
        <Button
            variant={'ghost'}
            size={'icon'}
            onClick={() => {
                patch(route(restoreRoute, entityId));
            }}
            isLoading={processing}
        >
            <Undo2 />
        </Button>
    );
};
