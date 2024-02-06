// Copyright (c) 2022 Tobias Briones. All rights reserved.
// SPDX-License-Identifier: GPL-3.0-or-later
// This file is part of https://github.com/repsymo/repsymo---mvp

export class InvalidModelException extends Error {
  constructor(modelType: string, msg: string) {
    super(`Invalid ${ modelType } model: ${ msg }`);
  }
}
