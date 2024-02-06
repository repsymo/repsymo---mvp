// Copyright (c) 2022 Tobias Briones. All rights reserved.
// SPDX-License-Identifier: GPL-3.0-or-later
// This file is part of https://github.com/repsymo/repsymo---mvp

import { InvalidModelException } from "../exception";

export function newInvalidModelException(msg: string) {
    return new InvalidModelException("Machine Replacement", msg);
}
