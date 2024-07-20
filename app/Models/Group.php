<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Group extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'owner_id',
        'last_message_id',
    ];

    /**
     * @return BelongsToMany
     */
    public function users(): \Illuminate\Database\Eloquent\Relations\BelongsToMany
    {
        return $this->belongsToMany(User::class, 'group_users');
    }

    /**
     * @return BelongsToMany
     */
    public function messages(): BelongsToMany
    {
        return $this->belongsToMany(Message::class);
    }

    /**
     * @return BelongsTo
     */
    public function owner(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * @param User $user
     * @return mixed
     */
    public static function getGroupsForUser(User $user): mixed
    {
        $query = self:: select(['groups.*', 'messages.message as last_message', 'messages.created_at as last_message_date'])
            ->join('group_users', 'group_users.group_id', '=', 'groups.id')
            ->leftJoin( 'messages', 'messages.id', '=', 'groups.last_message_id')
            ->where('group_users.user_id', $user->id)
            ->orderBy('messages.created_at', 'desc')
            ->orderBy('groups.name');

        return $query->get();
    }

    /**
     * @return array
     */
    public function toConversationArray(): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->descriptiond,
            'is_group' => true,
            'is_user' => false,
            'owner_id' => $this->owner_id,
            'users' => $this->users,
            'user_ids' => $this->users->pluck('id'),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'last_message' => $this->last_message,
            'last_message_date' => $this->last_message_date,
        ];
    }

    public static function updateGroupWithMessage($groupId, $message)
    {
        return self::updateOrCreate(
            ['id' => $groupId],
            ['last_message_id' => $message->id]
        );
    }
}
