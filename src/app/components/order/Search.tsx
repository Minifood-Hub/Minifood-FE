import { useState } from 'react';
import { SearchIcon } from '@/app/ui/iconPath';
import { callGet } from '@/app/utils/callApi';
import Input from '../common/Input';
import { ORDER_TEXT } from '@/app/constants/order';
import Icons from '../common/Icons';

interface SearchComponentProps {
  onSearchResultsUpdate: (results: ProductItemProps[]) => void;
}

export default function SearchComponent({
  onSearchResultsUpdate,
}: SearchComponentProps) {
  const [search, setSearch] = useState('');

  const handleSearch = async () => {
    try {
      const inputSearch = search ? encodeURIComponent(search) : '""';
      const data = await callGet(
        `/api/order/search`,
        `name_prefix=${inputSearch}&limit=100`,
      );
      onSearchResultsUpdate(data.result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-between px-6 w-[513px] bg-white border-[1px] border-gray-1 rounded-[4px] focus-within:border-gray-7 focus-within:border-[1px]">
      <Input
        textValue={search}
        type="search"
        onChange={(e) => setSearch(e.target.value)}
        placeholder={ORDER_TEXT[1]}
        onEnterPress={handleSearch}
      />
      <Icons onClick={handleSearch} name={SearchIcon} />
    </div>
  );
}
