import { useState } from 'react';
import { createContainer } from 'unstated-next';

const useLogDataGroupContainer = () => {
    const [logDataGroup, setLogDataGroup] = useState(null);

    return { logDataGroup, setLogDataGroup };
}

export default createContainer(useLogDataGroupContainer);