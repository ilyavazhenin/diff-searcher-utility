make install:
	npm install

make link:
	npm link

make lint:
	npx eslint .

make jest:
	npx jest

make test-coverage:
	npx jest --coverage
