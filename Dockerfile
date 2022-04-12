
FROM nginx:stable-alpine as production-stage
COPY ./ /usr/share/nginx/front/dist
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

