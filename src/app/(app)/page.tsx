
import 'server-only';
import Dashboard from '@/app/page';
import AppLayout from './layout';

export default function Page() {
    return (
        <AppLayout>
            <Dashboard />
        </AppLayout>
    )
}
