import { Order } from "./../core/models/orders/order.model";
export const CONTENTS = {
  NAME: "content",
  CONTENT: "content",
  NEW_CONTENT: "new",
  PREVIEW_CONTENT: "qr/:id",
  ASSIGN_CONTENT: "assign",
};

export const ORDERS = {
  NAME: "orders",
  ORDER: "order",
  LINKS: "links",
  ORDER_SERVICE: "order-service",
};
export const USERS = {
  NAME: "users",
  USER: "user",
  CREATE: "create",
};
export const MODULES = {
  CONTENTS: {
    CONTENT: `/${CONTENTS.NAME}/${CONTENTS.CONTENT}`,
    NEW_CONTENT: `/${CONTENTS.NAME}/${CONTENTS.NEW_CONTENT}`,
  },
  USERS: {
    USER: `/${USERS.NAME}/${USERS.USER}`,
    CREATE: `/${USERS.NAME}/${USERS.CREATE}`,
  },

  ORDERS: {
    ORDER_SERVICE: `/${ORDERS.NAME}/${ORDERS.ORDER}`,
    LINKS: `/${ORDERS.NAME}/${ORDERS.LINKS}`,
  },
};
