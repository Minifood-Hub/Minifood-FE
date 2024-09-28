import {
  ALERT_TEXT,
  BTN_TEXT,
  clientStatusMapping,
  INPUT_TEXT,
  TABLE_TEXT,
} from '@/app/constants/admin';
import { callGet, callGetBinary } from '@/app/utils/callApi';
import { formatDate } from '@/app/utils/date';
import { formatPrice } from '@/app/utils/formatPrice';
import { useState } from 'react';
import Button from '../../common/Button';
import ExtractAll from '../../order/ExtractAll';
import QuotationModal from '../../quotation/modal/view/QuotationModal';

export default function QuotationInfo() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState(formatDate(new Date().toISOString()));
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<{ items: AdminItemProps[] }>({
    items: [],
  });

  const [showQuote, setShowQuote] = useState(false);
  const [selectedId, setSelectedId] = useState<number>(0);

  const handleGetQuotations = async () => {
    if (!startDate || !endDate) {
      alert(ALERT_TEXT[0]);
      return;
    }

    try {
      const queryString = query
        ? `start=${startDate}&end=${endDate}&query=${query}`
        : `start=${startDate}&end=${endDate}`;

      const data = await callGet(
        `/api/admin/quotations/search/info`,
        queryString,
      );
      setResult({ items: data.result });
    } catch (error) {
      console.error(error);
      setResult({ items: [] });
    }
  };

  const handleExtractQuotation = async (quotation_id: number) => {
    if (!quotation_id) {
      alert(ALERT_TEXT[0]);
      return;
    }
    try {
      await callGetBinary(`/api/admin/quotations/extract/${quotation_id}`);
    } catch (error) {
      console.error(error);
    }
  };

  // 견적서 열기
  const handleShowQuote = (client_id: number) => {
    setSelectedId(client_id);
    setShowQuote(true);
  };

  // 견적서 닫기
  const handleCloseQuote = () => {
    setShowQuote(false);
    setSelectedId(0);
  };

  const renderTable = () => {
    return (
      <div className="w-full">
        <div className="flex bg-primary-1 w-full p-2 text-white font-bold">
          <div className="w-[5%]">{TABLE_TEXT[0]}</div>
          <div className="w-[30%]">{TABLE_TEXT[1]}</div>
          <div className="w-[15%]">{TABLE_TEXT[2]}</div>
          <div className="w-[15%]">{TABLE_TEXT[3]}</div>
          <div className="w-[10%]">{TABLE_TEXT[4]}</div>
          <div className="w-[15%] text-center">{TABLE_TEXT[5]}</div>
          <div className="w-[10%] text-center">{TABLE_TEXT[10]}</div>
        </div>
        {result.items.map((item: AdminItemProps) => (
          <div className="flex p-2 border-2" key={item.id}>
            <div className="w-[5%]">{item.id}</div>
            <div
              onClick={() => handleShowQuote(item.id)}
              className="w-[30%] cursor-pointer underline"
            >
              {item.name}
            </div>
            <div className="w-[15%]">{formatDate(item.created_at)}</div>
            <div className="w-[15%]">{item.updated_at || '-'}</div>
            <div className="w-[10%]">{clientStatusMapping[item.status]}</div>
            <div className="w-[15%] text-center">
              {formatPrice(item.total_price)} 원
            </div>
            <div className="w-[10%] text-center">
              <Button
                type="default"
                className="admin-btn"
                onClickHandler={() => {
                  handleExtractQuotation(item.id);
                }}
                buttonText={TABLE_TEXT[13]}
              />
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-4 border-2 p-8">
      <ExtractAll />

      <div className="flex  items-center flex-col lg:flex-row gap-2 lg:gap-8">
        <p className="font-bold text-lg break-words min-w-[80px]">
          견적서 검색하기:
        </p>
        <div className="flex gap-4 items-center">
          <p className="whitespace-nowrap">{INPUT_TEXT[0]}</p>
          <input
            className="w-40 h-10 border rounded px-4"
            type="date"
            onChange={(e) => setStartDate(e.target.value)}
            onClick={(e) => (e.target as HTMLInputElement).showPicker()}
            value={startDate}
            placeholder={INPUT_TEXT[0]}
          />
        </div>
        <div className="flex gap-4 items-center">
          <p className="whitespace-nowrap">{INPUT_TEXT[1]}</p>
          <input
            className="w-40 h-10 border rounded px-4"
            type="date"
            onChange={(e) => setEndDate(e.target.value)}
            onClick={(e) => (e.target as HTMLInputElement).showPicker()}
            value={endDate}
            placeholder={INPUT_TEXT[1]}
          />
        </div>
        <div className="flex items-center gap-4">
          <div className="flex gap-4 items-center">
            <p className="whitespace-nowrap">{INPUT_TEXT[3]}</p>
            <input
              className="admin-input"
              type="text"
              onChange={(e) => setQuery(e.target.value)}
              value={query}
              placeholder={INPUT_TEXT[3]}
            />
          </div>
          <Button
            className="admin-btn"
            buttonText={BTN_TEXT[4]}
            type="default"
            onClickHandler={handleGetQuotations}
          />
        </div>
      </div>

      <div className="w-full">{renderTable()}</div>
      {showQuote && (
        <QuotationModal closeModal={handleCloseQuote} id={selectedId} isAdmin />
      )}
    </div>
  );
}
