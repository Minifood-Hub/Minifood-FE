export const COMMON_PRODUCTDATA = {
  name: '[유기농] 신선 토마토',
  image_url:
    'https://i.namu.wiki/i/n2LztcrML9hzPww_iKNeMuh34vg48dkmZmGuMEC_e-DSpNoPGwch9nR9FZz9WfVx6nvv5aSDxqlxEG8iA9tcLQ.webp',
  description: '제철 토마토 맛있어요',
  category: '채소',
  unit: '1kg',
  price: 900,
  created_at: '2024-08-28T11:31:32.695Z',
  updated_at: '2024-08-28T11:31:32.695Z',
};

export const CUSTOM_MOOKDATA: CustomProductType[] = [
  {
    id: 0,
    ...COMMON_PRODUCTDATA,
  },
  {
    id: 1,
    ...COMMON_PRODUCTDATA,
  },
  {
    id: 2,
    ...COMMON_PRODUCTDATA,
  },
  {
    id: 3,
    ...COMMON_PRODUCTDATA,
  },
  {
    id: 4,
    ...COMMON_PRODUCTDATA,
  },
  {
    id: 5,
    ...COMMON_PRODUCTDATA,
  },
];

export const COMMON_CARDTEXT = {
  firstline: '요식업 전문가를 위한 프리미엄 식자재',
  secondlinre: 'Minifood에서 간편하게 주문해보세요',
};

export const CUSTOM_MAINCARD_TEXT = [
  {
    id: 0,
    ...COMMON_CARDTEXT,
  },
  {
    id: 1,
    ...COMMON_CARDTEXT,
  },
  {
    id: 2,
    ...COMMON_CARDTEXT,
  },
  {
    id: 3,
    ...COMMON_CARDTEXT,
  },
];
