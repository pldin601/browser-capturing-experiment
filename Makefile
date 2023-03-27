build:
	docker build -t chromium-capture-test .

run:
	docker run --rm -i chromium-capture-test | ffplay -

shell:
	docker run --rm -it chromium-capture-test bash

.PHONY: build run shell
