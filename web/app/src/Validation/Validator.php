<?php

namespace App\Validation;

use Respect\Validation\Validator as Respect;
use Respect\Validation\Exceptions\NestedValidationException;

class Validator
{
    protected $errors;

    public function validate($request, array $rules)
    {
        $body = $request->getParsedBody();
        foreach ($rules as $field => $rule) {
            $ucField = ucfirst($field);
            try {
                $rule->setName($ucField)->assert($body[$field]);
            } catch (NestedValidationException $e) {
                $this->errors[$field] = $e->getMessages()[$ucField];
            }
        }

        return $this;
    }

    public function failed()
    {
        return !empty($this->errors);
    }

    public function __get($name)
    {
        return $this->$name;
    }
}
