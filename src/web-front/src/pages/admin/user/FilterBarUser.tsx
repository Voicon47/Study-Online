import { Button } from '@nextui-org/react';
import Search from '../../../components/Search';
import { GrPowerReset } from 'react-icons/gr';
import { useEffect, useState } from 'react';
import { IFilterUser } from '.';

type PropsType = {
   onChange: (text: IFilterUser) => void;
};
function FilterBarUser(props: PropsType) {
   // const [search, setSearch] = useState('');
   const [query, setQuery] = useState<string | null>(null);
   useEffect(() => {
      let filter = {
          query,
      };
      props.onChange(filter);
  }, [query]);
   return (
      <div className="flex mt-10 justify-between items-end gap-10 rounded-xl shadow-xl bg-light-sidebar backdrop-blur-xl dark:bg-dark-sidebar w-full p-4">
         <div className="w-full flex  items-center gap-6">
            {/* <Search
               value={search}
               onChange={(text) => {
                  setSearch(text);
                  onChange(text);
               }}
               placeholder="Tìm kiếm theo tên, email, ..."
            /> */}
            <Search onChange={(val) => setQuery(val)} placeholder="Tìm kiếm theo tên, email, ..." />
            <Button
               onClick={() => {
                  // onChange();
                  setQuery('');
                  props.onChange({query: null})

               }}
               startContent={<GrPowerReset className="text-xl" />}
               variant="flat"
               color="primary"
            >
               Làm mới lọc
            </Button>
         </div>
      </div>
   );
}

export default FilterBarUser;
